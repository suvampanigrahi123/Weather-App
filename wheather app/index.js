const weatherTemp=document.querySelector('#temp');
const weatherlocation=document.querySelector('.weather2 p');
const Localtime=document.querySelector('.weather2 span');
const conditionemoji=document.querySelector('.weather3 p img');
const weathercondition=document.querySelector('.weather3 span');
const form=document.querySelector('form');
const InputData=document.querySelector('form input');
const fetchData=async(target="bhadrak")=>{
try {
        const url=`https://api.weatherapi.com/v1/current.json?key=98f3bb165a4146868a5143515221908&q=${target}`
        const response=await fetch(url);
        const result=await response.json();
        const {location:{
            name,localtime
        },current:{temp_c,condition:{text,icon}}}=result;
        const WeatherTime=GetTimeData(localtime)
        UpdateDom(name,temp_c,text,icon,WeatherTime)
    } catch (error) {
        alert('Enter Valid Location')
    }
}
function UpdateDom(cityname,temp,condition,emoji,time){

    weatherlocation.innerHTML=cityname;
    weatherTemp.innerHTML=`${temp}°C`;
    weathercondition.innerHTML=condition;
    conditionemoji.src=emoji;
    Localtime.innerHTML=time;
}
fetchData('Bhadrak')
function getFullDay(num){
    switch (num) {
        case 0:
          return  'Sunday'
        case 1:
          return  'Monday'
        case 2:
            return  'Tuesday'
        case 3:
            return  'Wednesday'
        case 4:
            return  'Thrusday'
        case 5:
            return  'Friday'
        case 6:
            return  'Saturday'
    }
}
function GetTimeData(localtime){
    let date=String(localtime).split(" ")[0]
    let timeData=String(localtime).split(" ")[1]
    let Day=getFullDay(new Date(date).getDay());
    const time=`${timeData.split(":")[0]>12 ?timeData.split(":")[0]-12 :timeData.split(":")[0] }:${timeData.split(":")[1]} ${timeData.split(":")[0]>12? 'pm':'am'}`
    return `${time} ${Day} ${date}`
}

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    if(!InputData.value){
        alert('Enter a Location')
    }else{
        fetchData(InputData.value)
    }
})