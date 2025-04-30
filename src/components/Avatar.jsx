import React, { useEffect, useRef, useMemo } from 'react';
import { useGraph, useFrame } from '@react-three/fiber';
import { useGLTF, useFBX, useAnimations } from '@react-three/drei';
import { SkeletonUtils } from 'three-stdlib';
import { useControls } from 'leva';
import * as THREE from 'three';

export function Avatar(props) {
    const {animation, wireframe} = props;
  const { headFollow, cursorFollow } = useControls({
    headFollow:false,
    cursorFollow:false,
  });
  const group = useRef();

  // Load and clone the GLB model
  const { scene } = useGLTF('/models/6809ded26026f5144d94f0c6.glb');
  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const { nodes, materials } = useGraph(clone);

  // Load the FBX animation
  const typingFBX = useFBX('/animations/Typing.fbx');
  const standingFBX = useFBX('/animations/Standing Idle.fbx');
  const fallingFBX = useFBX('/animations/Falling Idle.fbx');
  
  const animations = useMemo(() => {
    const renamedAnimations = [];
  
    if (typingFBX.animations[0]) {
      typingFBX.animations[0].name = 'Typing';
      renamedAnimations.push(typingFBX.animations[0]);
    }
  
    if (standingFBX.animations[0]) {
      standingFBX.animations[0].name = 'Standing';
      renamedAnimations.push(standingFBX.animations[0]);
    }
  
    if (fallingFBX.animations[0]) {
      fallingFBX.animations[0].name = 'Falling';
      renamedAnimations.push(fallingFBX.animations[0]);
    }
  
    return renamedAnimations;
  }, [typingFBX, standingFBX, fallingFBX]);
  
  // Bind animations to the group
  const { actions } = useAnimations(animations, group);

  useFrame((state) =>{
    if (headFollow) {
    group.current.getObjectByName("Head").lookAt(state.camera.position);
    }
    if (cursorFollow) {
        const target = new THREE.Vector3(state.mouse.x, state.mouse.y, 1);
        group.current.getObjectByName("Spine2").lookAt(target);
    }
  });

  // Play animation on mount
  useEffect(() => {
    actions[animation].reset().play();
    return() => {
        actions[animation].reset().fadeOut(0.5);
    }
  }, [animation]);


  useEffect(() => {
    Object.values(materials).forEach((material) => {
        material.wireframe = wireframe;
    });
  }, [wireframe]);
  
  return (
    <group ref={group} {...props} dispose={null}>
        <primitive object={nodes.Hips} />
        <skinnedMesh frustumCulled={false} geometry={nodes.Wolf3D_Hair.geometry} material={materials.Wolf3D_Hair} skeleton={nodes.Wolf3D_Hair.skeleton} />
        <skinnedMesh frustumCulled={false} geometry={nodes.Wolf3D_Outfit_Top.geometry} material={materials.Wolf3D_Outfit_Top} skeleton={nodes.Wolf3D_Outfit_Top.skeleton} />
        <skinnedMesh frustumCulled={false} geometry={nodes.Wolf3D_Outfit_Bottom.geometry} material={materials.Wolf3D_Outfit_Bottom} skeleton={nodes.Wolf3D_Outfit_Bottom.skeleton} />
        <skinnedMesh frustumCulled={false} geometry={nodes.Wolf3D_Outfit_Footwear.geometry} material={materials.Wolf3D_Outfit_Footwear} skeleton={nodes.Wolf3D_Outfit_Footwear.skeleton} />
        <skinnedMesh frustumCulled={false} geometry={nodes.Wolf3D_Body.geometry} material={materials.Wolf3D_Body} skeleton={nodes.Wolf3D_Body.skeleton} />
        <skinnedMesh frustumCulled={false} name="EyeLeft" geometry={nodes.EyeLeft.geometry} material={materials.Wolf3D_Eye} skeleton={nodes.EyeLeft.skeleton} morphTargetDictionary={nodes.EyeLeft.morphTargetDictionary} morphTargetInfluences={nodes.EyeLeft.morphTargetInfluences} />
        <skinnedMesh frustumCulled={false} name="EyeRight" geometry={nodes.EyeRight.geometry} material={materials.Wolf3D_Eye} skeleton={nodes.EyeRight.skeleton} morphTargetDictionary={nodes.EyeRight.morphTargetDictionary} morphTargetInfluences={nodes.EyeRight.morphTargetInfluences} />
        <skinnedMesh frustumCulled={false} name="Wolf3D_Head" geometry={nodes.Wolf3D_Head.geometry} material={materials.Wolf3D_Skin} skeleton={nodes.Wolf3D_Head.skeleton} morphTargetDictionary={nodes.Wolf3D_Head.morphTargetDictionary} morphTargetInfluences={nodes.Wolf3D_Head.morphTargetInfluences} />
        <skinnedMesh frustumCulled={false} name="Wolf3D_Teeth" geometry={nodes.Wolf3D_Teeth.geometry} material={materials.Wolf3D_Teeth} skeleton={nodes.Wolf3D_Teeth.skeleton} morphTargetDictionary={nodes.Wolf3D_Teeth.morphTargetDictionary} morphTargetInfluences={nodes.Wolf3D_Teeth.morphTargetInfluences} />
    </group>
  );
}

useGLTF.preload('/models/6809ded26026f5144d94f0c6.glb');
