import React, { useState } from 'react';
import axios from 'axios';
import { json } from 'react-router-dom';
import styles from '../main.module.css';
import Headerjs from './header';
import Footerjs from './footer';

function KeywordInput(){
    const [name, setName] = useState('');
    const [personality, setPersonality] = useState('');
    const [animal, setAnimal] = useState('');
    const [animal_feature, setAnimalFeature] = useState('');

    const handleNameChange = (e) => {
        setName(e.target.value);
    };
    const handlePersonalityChange = (e) => {
        setPersonality(e.target.value);
    };
    const handleAnimalChange = (e) => {
        setAnimal(e.target.value);
    };
    const handleAnimalFeatureChange = (e) => {
        setAnimalFeature(e.target.value);
    };

    const handleSubmit = (e) => {  // input post
        const data = {
            name: name,
            personality: personality,
            animal: animal,
            animal_feature: animal_feature
        };

        console.log(data);

         //axios.post('http://127.0.0.1:8000/fairytale', data)
         axios.post('http://127.0.0.1:8000/testkeyword/', data)  // 테스트용 백으로 post
         .then(response => {
             console.log(response.data);
         })
         .catch(error =>{
             console.error('Error', error);
         });

    };

    function getRandomElement(arr){
        const randomIndex = Math.floor(Math.random() * arr.length);
        return arr[randomIndex];
    }
    function randomJson(){
        const names = ['영수', '민수', '영희', '철수'];
        const personalities = ['착함', '노래를 잘함', '잘 웃음', '운동을 잘함'];
        const animals = ['돼지', '고양이', '개', '원숭이'];
        const animal_features = ['착함', '노래를 잘함', '잘 웃음', '운동을 잘함'];

        const r_name = getRandomElement(names);
        const r_personality = getRandomElement(personalities);
        const r_animal = getRandomElement(animals);
        const r_animal_feature = getRandomElement(animal_features);

        const jsonData = {
            name: r_name,
            personality: r_personality,
            animal: r_animal,
            animal_feature: r_animal_feature,
        }
        return jsonData;
    }

    const handelSetInput = (e) => { // random input
        const jsonData = randomJson();
        
        setName(jsonData.name);
        setPersonality(jsonData.personality);
        setAnimal(jsonData.animal);
        setAnimalFeature(jsonData.animal_feature);
    };

   return(
    <div className={styles.body}>
        <button>내가 직접 만드는 동화</button>
        <button> 내가 그린 그림으로 만드는 동화</button>
        <p>주인공의 이름은 뭐야?</p>
        <input type = "text" value = {name} onChange={handleNameChange}></input>
        <p>주인공의 특징은 뭐야?</p>
        <input type = "text" value = {personality} onChange={handlePersonalityChange}></input>
        <p>어떤 동물이 나올까?</p>
        <input type = "text" value = {animal} onChange={handleAnimalChange}></input>
        <p>그 동물의 특징은 뭐야?</p>
        <input type = "text" value = {animal_feature} onChange={handleAnimalFeatureChange}></input>
        <button onClick={handelSetInput}>아무거나 넣어볼래요</button>
        <button onClick={handleSubmit }>동화 만들어 주세요</button>
    </div>

   ); 
}


function FairytalePage(){
    return (
        <div className="app">
          <Headerjs></Headerjs>
          <KeywordInput></KeywordInput>
          <Footerjs></Footerjs>
        </div>
      );
    }

export default FairytalePage;