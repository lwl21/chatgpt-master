<script setup lang="ts">
/* eslint-disable*/
import {NConfigProvider} from 'naive-ui'
import { NaiveProvider } from '@/components/common'
import { useTheme } from '@/hooks/useTheme'
import { useLanguage } from '@/hooks/useLanguage'
const { theme, themeOverrides } = useTheme()
const { language } = useLanguage()

</script>

<template>
	<n-message-provider>
		<NConfigProvider
			class="h-full"
			:theme="theme"
			:theme-overrides="themeOverrides"
			:locale="language"
		>
			<NaiveProvider>
				<RouterView />
			</NaiveProvider>
		</NConfigProvider>
	</n-message-provider>
</template>
