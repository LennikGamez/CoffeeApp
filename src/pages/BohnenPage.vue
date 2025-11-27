<script lang="ts" setup>
import Bohne from "../components/BohnenComponent.vue";
import AddButton from "../components/AddButton.vue";
import { Bohne as BohnenType } from "../DB-Models";
import { Ref, ref } from "vue";
import APIConnector from "../util/APIConnector";

const bohnenDataRef: Ref<BohnenType[]> = ref([] as BohnenType[]);
const bohnenPage: Ref<HTMLDivElement | null> = ref(null);

function addBohnenData(data: BohnenType) {
  bohnenDataRef.value.push(data);

  setTimeout(() => {
    if (bohnenPage.value) {
      bohnenPage.value.scrollTo({
        top: bohnenPage.value.scrollHeight,
        behavior: "smooth",
      });
    }
  }, 1);

  APIConnector.addBohnen(data).then(() => fetchData());
}

function fetchData() {
  APIConnector.getBohnen().then((data) => (bohnenDataRef.value = data));
}

function deleteBohne(data: BohnenType) {
  bohnenDataRef.value = bohnenDataRef.value.filter((bohne) => data !== bohne);
}

fetchData();
</script>

<template>
  <div id="bohnen-page" ref="bohnenPage">
    <h1>Bohnen</h1>
    <div id="bohnen-list">
      <Bohne
        v-for="(item, index) in bohnenDataRef"
        :key="index"
        :data="item"
        :editMode="false"
        @deleted="deleteBohne(item)"
      />
    </div>

    <AddButton
      id="add"
      @click="
        addBohnenData({
          Name: 'Neue Bohne',
          Röster: '',
          Website: '',
          Notiz: '',
          VorhandendeMenge: null,
        } as BohnenType)
      "
    />
  </div>
</template>

<style scoped>
#bohnen-page {
  display: flex;
  flex-direction: column;
  position: relative;
}
#bohnen-list {
  display: flex;
  flex-wrap: wrap;
  gap: 32px;
  align-items: center;
  justify-content: center;
}

#add {
  position: fixed;
  bottom: 65px;
  right: 0;

  align-self: center;

  width: 42;
  padding: 8px 16px;
  aspect-ratio: 1/1;

  background-color: var(--secondary-color);
  margin: 16px;

  display: flex;
  justify-content: center;
  align-items: center;

  transition: transform 0.5s ease-in-out;
}

#add:hover {
  transform: rotate(-360deg);
}
</style>
