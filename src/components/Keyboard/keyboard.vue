<script setup lang="ts">
import { ref } from 'vue';

    let dragging = false;
    let startPos = {"x": 0, "y": 0};

    window.addEventListener("mousemove", drag)

    const keyboard = ref<HTMLDivElement | null>(null);

    function hide(){
        keyboard.value?.classList.remove("visible");
    }
    function show(){
        keyboard.value?.classList.add("visible");
    }

    function appendInput(event: Event, symbol: String){
        event.preventDefault();
        const activeInput = document.activeElement as HTMLInputElement;
        const cursorPosition = activeInput.selectionStart;
        
        // insert the symbol at cursor position
        console.log(cursorPosition)
        if (cursorPosition === null) return;
        activeInput.value = activeInput.value.slice(0, cursorPosition) + symbol + activeInput.value.slice(cursorPosition);

        // set cursor position
        activeInput.selectionStart = cursorPosition + 1;
        activeInput.selectionEnd = cursorPosition + 1;
    }
    function removeInput(event: Event){
        event.preventDefault();
        const activeInput = document.activeElement as HTMLInputElement;
        activeInput.value = activeInput.value.slice(0, -1)
    }

    function startDrag(event: MouseEvent){
        event?.preventDefault();
        dragging = true;
        startPos = {"x": event.offsetX, "y": event.offsetY};
    }
    function drag(event: MouseEvent){
        if (!dragging) return
        if (!keyboard.value) return
        const diff = {"x": event.clientX - startPos.x, "y": event.clientY - startPos.y};
        keyboard.value.style.left = diff.x + "px";
        keyboard.value.style.top = diff.y + "px";
    }
    function stopDrag(event: MouseEvent){
        event.preventDefault();
        dragging = false;
    }

    defineExpose({hide, show})
</script>


<template>
    <div id="keyboard" ref="keyboard" @mousedown="startDrag" @mouseup="stopDrag">
        <div class="button" @mousedown='appendInput($event, "1")'>1</div>
        <div class="button" @mousedown='appendInput($event, "2")'>2</div>
        <div class="button" @mousedown='appendInput($event, "3")'>3</div>
        <div class="button" @mousedown='appendInput($event, "4")'>4</div>
        <div class="button" @mousedown='appendInput($event, "5")'>5</div>
        <div class="button" @mousedown='appendInput($event, "6")'>6</div>
        <div class="button" @mousedown='appendInput($event, "7")'>7</div>
        <div class="button" @mousedown='appendInput($event, "8")'>8</div>
        <div class="button" @mousedown='appendInput($event, "9")'>9</div>
        <div class="button" @mousedown='appendInput($event, ".")'>.</div>
        <div class="button" @mousedown='appendInput($event, "0")'>0</div>
        <div @mousedown='removeInput' id="backspace">
            <img src="../../assets/backspace.svg" />
        </div>
    </div>
</template>


<style>

    #keyboard{
        position: absolute;
        width: max-content;
        height: max-content;
        right: 50px;
        top: 50%;
        text-align: center;
        display: none;
        grid-template-columns: 1fr 1fr 1fr;

        border-radius: var(--border-radius);
        border: 1px solid black;

        padding-top: 30px;
        background-color: white;
        box-shadow: 0px 12px 20px rgba(0, 0, 0, 0.226);
        z-index: 100;
        
    }
    #keyboard::before{
        content: '====';
        position: absolute;
        left: 50%;
        transform: translate(-50%);
    }

    #keyboard.visible{
        display: grid;
    }

    #keyboard > *:hover{
        cursor: pointer;
        background-color: lightgray;
        user-select: none;
    }

    #keyboard > *{
        aspect-ratio: 1/1;
        background-color: white;

        border: thin dotted lightgray;
        border-radius: var(--border-radius);
    }

    .button{
        font-size: 1.5rem;
    }

    #backspace{
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>

