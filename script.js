const text = document.getElementById('text');
const voice = document.getElementById('voice');
const speechBtn = document.querySelector('button');
const voiceList = document.querySelector('select');

let synth = speechSynthesis;
isSpeaking = true;

voices();

function voices(){
    for(let voice of synth.getVoices()){

        let selected = voice.name === "Google US English"? "selected": "";
        console.log(voice);
        let option = `<option value="${voice.name}" ${selected}>${voice.name} (${voice.lang})</option>`
        voiceList.insertAdjacentHTML("beforeend", option);
    }
}
synth.addEventListener("voiceschanged", voices);

function textToSpeech(text){
    let utterance = new SpeechSynthesisUtterance(text);
    for(let voice of synth.getVoices()){
        if(voice.name === voiceList.value){
            utterance.voice = voice;
        }
    }
    synth.speak(utterance);
}

speechBtn.addEventListener('click', (e)=>{
    e.preventDefault();

    if(text.value!==""){

        if(!synth.speaking){
            textToSpeech(text.value);
        }
        if(text.value.length>30){
            setInterval(()=>{
                if(!synth.speaking && !isSpeaking){
                    isSpeaking = true;
                    speechBtn.innerText ="Convert to Speech";
                }
            },500);
            if(isSpeaking){
                synth.resume();
                isSpeaking=false;
                speechBtn.innerText = "Pause Speech";
            }else{
                synth.pause();
                isSpeaking = true;
                speechBtn.innerText = "Resume Speech";
            }
        }else{
            speechBtn.innerText ="Convert to Speech";
        }
        
    }
})

