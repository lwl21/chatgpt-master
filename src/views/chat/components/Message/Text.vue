<script lang="ts" setup>
/* eslint-disable*/
import { computed, onMounted, onUnmounted, onUpdated, ref } from "vue";
import MarkdownIt from "markdown-it";
import mdKatex from "@traptitech/markdown-it-katex";
import mila from "markdown-it-link-attributes";
import hljs from "highlight.js";
import { useBasicLayout } from "@/hooks/useBasicLayout";
import { t } from "@/locales";
import { copyToClip } from "@/utils/copy";
import { useMessage } from "naive-ui";
import { mgr } from "@/utils/oidc-client";

interface Props {
  inversion?: boolean;
  nodeText?: string;
  error?: boolean;
  text?: string;
  loading?: boolean;
  asRawText?: boolean;
}

const props = defineProps<Props>();

const { isMobile } = useBasicLayout();

const textRef = ref<HTMLElement>();

const mdi = new MarkdownIt({
  html: false,
  linkify: true,
  highlight(code, language) {
    const validLang = !!(language && hljs.getLanguage(language));
    if (validLang) {
      const lang = language ?? "";
      return highlightBlock(
        hljs.highlight(code, { language: lang }).value,
        lang
      );
    }
    return highlightBlock(hljs.highlightAuto(code).value, "");
  },
});

mdi.use(mila, { attrs: { target: "_blank", rel: "noopener" } });
mdi.use(mdKatex, {
  blockClass: "katexmath-block rounded-md p-[10px]",
  errorColor: " #cc0000",
});

const wrapClass = computed(() => {
  return [
    "text-wrap",
    "min-w-[20px]",
    "rounded-md",
    isMobile.value ? "p-2" : "px-3 py-2",
    props.inversion ? "bg-[#d2f9d1]" : "bg-[#f4f6f8]",
    props.inversion ? "dark:bg-[#a1dc95]" : "dark:bg-[#1e1e20]",
    props.inversion ? "message-request" : "message-reply",
    { "text-red-500": props.error },
  ];
});
const point = ref(false);
const text = computed(() => {
  const value = props.text ?? "";
  if (!props.asRawText) return mdi.render(value);
  return value;
});
const nodeText = computed(() => {
  const value = props.nodeText ?? "";
  if (!props.asRawText) return mdi.render(value);
  console.log(value, "value");
  return value;
});
function highlightBlock(str: string, lang?: string) {
  return `<pre class="code-block-wrapper"><div class="code-block-header"><span class="code-block-header__lang">${lang}</span><span class="code-block-header__copy">${t(
    "chat.copyCode"
  )}</span></div><code class="hljs code-block-body ${lang}">${str}</code></pre>`;
}

function addCopyEvents() {
  if (textRef.value) {
    const copyBtn = textRef.value.querySelectorAll(".code-block-header__copy");
    copyBtn.forEach((btn) => {
      btn.addEventListener("click", () => {
        const code = btn.parentElement?.nextElementSibling?.textContent;
        if (code) {
          copyToClip(code).then(() => {
            btn.textContent = "复制成功";
            setTimeout(() => {
              btn.textContent = "复制代码";
            }, 1000);
          });
        }
      });
    });
  }
}

function removeCopyEvents() {
  if (textRef.value) {
    const copyBtn = textRef.value.querySelectorAll(".code-block-header__copy");
    copyBtn.forEach((btn) => {
      btn.removeEventListener("click", () => {});
    });
  }
}
const ms = useMessage();
function toLogin(event: any) {
  if (
    event.target?.innerText === "无访问权限,请点击这里登录" &&
    !localStorage.getItem("token")
  ) {
    mgr.createSigninRequest({ state: { returnUrl: "/" } }).then((req) => {
      ms.warning("即将跳转到登录页面");
      setTimeout(() => {
        location.href = req.url;
      }, 500);
    });
  }
}
function handleStyle() {
  let falseText = "";
  if (text.value.split("<p>")[1]) {
    falseText = text.value.split("<p>")[1].split("</p>")[0];
    if (
      falseText === "无访问权限,请点击这里登录" &&
      !localStorage.getItem("token")
    ) {
      point.value = true;
    }
  }
}

onMounted(() => {
  addCopyEvents();
  handleStyle();
});

onUpdated(() => {
  addCopyEvents();
  handleStyle();
});

onUnmounted(() => {
  removeCopyEvents();
});
</script>

<template>
  <div class="text-black" :class="wrapClass">
    <div
      ref="textRef"
      class="leading-relaxed break-words"
      :style="point ? { cursor: 'pointer' } : ''"
    >
      <div v-if="!inversion">
        <div class="loadText" v-html="nodeText" />
        <div
          v-if="!asRawText"
          class="markdown-body"
          v-html="text"
          @click="toLogin"
        />
        <div v-else class="whitespace-pre-wrap">
          <!-- <div v-text="nodeText" /> -->
          <div v-text="text" />
        </div>
      </div>
      <div v-else class="whitespace-pre-wrap" v-text="text" />
      <template v-if="loading">
        <span class="dark:text-white w-[4px] h-[20px] block animate-blink" />
      </template>
    </div>
  </div>
</template>

<style lang="less">
.loadText{
  opacity: .5;
  font-size: 13px;
  margin-bottom: 6px;
}
@import url(./style.less);
</style>
