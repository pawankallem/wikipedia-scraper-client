<template>
  <div class="py-10">
    <div
      class="container mx-auto max-w-screen-xl w-full sm:w-4/5 md:w-3/5 lg:w-3/5 xl:w-3/5"
    >
      <div
        :style="
          isDarkMode
            ? `color: ${this.hexCodes.white}; background-color: ${this.hexCodes.dark}`
            : `color: ${this.hexCodes.dark}; background-color: ${this.hexCodes.white}`
        "
        class="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4 dark:bg-gray-800"
      >
        <h2
          :style="
            isDarkMode
              ? `color: ${this.hexCodes.white}`
              : `color: ${this.hexCodes.dark}`
          "
          class="text-2xl font-semibold mb-6 text-black dark:text-white"
        >
          Search Wikipedia URL
        </h2>
        <form action="" @submit.prevent="handleSearch()" class="relative">
          <input
            class="py-2 pl-4 pr-12 block w-full rounded-lg bg-gray-200 border-none focus:outline-none focus:ring-0 text-black dark:text-white"
            type="text"
            placeholder="Enter Wikipedia URL..."
            v-model="inputURL"
          />
          <span
            class="search-icon absolute inset-y-0 right-0 pr-4 flex items-center"
            @click.prevent="handleSearch()"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-5-5m-1-6a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </span>
        </form>
      </div>
    </div>
    <button
      class="toggle-button bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
      @click="handleToggle()"
    >
      <span v-html="handleIcon()"></span>
    </button>
    <div
      id="result-container"
      class="container mx-auto max-w-screen-xl w-full sm:w-4/5 md:w-3/5 lg:w-3/5 xl:w-3/5"
    >
      <p
        v-show="this.paragraphData"
        v-html="this.paragraphData"
        id="result-paragraph"
        class="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4 text-black dark:bg-gray-800"
        :style="
          isDarkMode
            ? `color: ${this.hexCodes.white}; background-color: ${this.hexCodes.dark}`
            : `color: ${this.hexCodes.dark}; background-color: ${this.hexCodes.white}`
        "
        @click="handleParagraphClick($event)"
      ></p>
    </div>
    <div v-show="isLoading" id="loader">
      <div class="lds-hourglass"></div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import "@fortawesome/fontawesome-free/css/all.css";
import sunraise from "../assets/sunraise.jpg";
import moonlight from "../assets/moonlight.jpg";
const body = document.body;

export default {
  name: "scraper-input",
  data() {
    return {
      domainURL: "https://wikipedia-scraper-client.vercel.app", //"http://localhost:5173", // 
      wikiURL: "https://en.wikipedia.org/wiki/",
      serverURL: "https://wikipedia-scraper-vmuk.onrender.com",
      inputURL: "",
      isDarkMode: true,
      isLoading: false,
      paragraphData: "",
      hexCodes: {
        white: "#ffffff",
        dark: "#1a202c",
      },
    };
  },
  methods: {
    async fetchData(url) {
      try {
        this.isLoading = true;
        const response = await axios.post(`${this.serverURL}/execute_url`, {
          url: url,
        });
        this.paragraphData = response.data.data;
        this.isLoading = false;
      } catch (error) {
        this.isLoading = false;
        console.log("error : ", error);
      }
    },
    handleSearch() {
      if (!this.inputURL.includes(this.wikiURL)) {
        alert(
          `Please enter valid Wikipedia URL (example : ${this.wikiURL}{seach_word})`
        );
        return;
      }
      if (this.inputURL && !this.isLoading) this.fetchData(this.inputURL);
    },
    handleParagraphClick(event) {
      if (event.target.tagName === "A") {
        event.preventDefault();
        const linkUrl = event.target.href;
        const url = linkUrl.replace(`${this.domainURL}/wiki/`, this.wikiURL);
        if (url && !this.isLoading) this.fetchData(url);
      }
    },
    handleToggle() {
      if (this.isDarkMode) {
        body.style.backgroundImage = `url(${moonlight})`;
        this.handleDarkMode();
      } else {
        body.style.backgroundImage = `url(${sunraise})`;
        this.handleLightMode();
      }
      this.isDarkMode = !this.isDarkMode;
    },
    handleDarkMode() {
      body.style.backgroundColor = this.hexCodes.white;
      body.style.color = this.hexCodes.dark;
    },
    handleLightMode() {
      body.style.backgroundColor = this.hexCodes.dark;
      body.style.color = this.hexCodes.white;
    },
    handleIcon() {
      return this.isDarkMode
        ? '<i class="fas fa-sun"></i>'
        : '<i class="fas fa-moon"></i>';
    },
  },
  mounted() {
    this.handleToggle();
  },
};
</script>
