<template>
  <section
    class="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-slate-50 via-indigo-50 to-slate-100 px-4 py-10"
  >
    <div
      class="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 rounded-2xl shadow-xl overflow-hidden bg-white"
    >
      <!-- Left / Brand panel -->
      <div
        class="hidden md:flex flex-col justify-between bg-gradient-to-br from-indigo-600 to-indigo-800 text-white p-10"
      >
        <div>
          <div class="flex items-center gap-2">
            <div
              class="h-10 w-10 rounded-lg bg-white/15 flex items-center justify-center font-bold text-lg"
            >
              N
            </div>
            <span class="text-xl font-semibold tracking-wide">NPM Module</span>
          </div>

          <h1 class="mt-16 text-3xl font-bold leading-snug">
            Welcome back.
          </h1>
          <p class="mt-3 text-indigo-100 text-sm leading-relaxed">
            Sign in to manage your packages, track releases and keep your
            workflow moving.
          </p>
        </div>

        <p class="text-xs text-indigo-200">
          &copy; {{ new Date().getFullYear() }} NPM Module. All rights
          reserved.
        </p>
      </div>

      <!-- Right / Form panel -->
      <div class="p-8 sm:p-12 flex flex-col justify-center">
        <div class="md:hidden flex items-center gap-2 mb-8">
          <div
            class="h-9 w-9 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold"
          >
            N
          </div>
          <span class="text-lg font-semibold text-slate-800">NPM Module</span>
        </div>

        <h2 class="text-2xl font-bold text-slate-800">Sign in</h2>
        <p class="text-sm text-slate-500 mt-1 mb-8">
          Enter your credentials to access your account.
        </p>

        <a-form layout="vertical" class="space-y-1">
          <a-form-item label="Email">
            <a-input size="large" placeholder="you@example.com">
              <template #prefix>
                <UserOutlined class="text-slate-400" />
              </template>
            </a-input>
          </a-form-item>

          <a-form-item label="Password">
            <a-input-password size="large" placeholder="••••••••">
              <template #prefix>
                <LockOutlined class="text-slate-400" />
              </template>
            </a-input-password>
          </a-form-item>

          <a-button
            type="primary"
            size="large"
            block
            class="!mt-4 !bg-indigo-600 hover:!bg-indigo-700 !border-none !font-medium"
          >
            Sign in
          </a-button>
        </a-form>

     

      </div>
    </div>
  </section>
</template>

<script setup>
import {
  UserOutlined,
  LockOutlined,
  GoogleOutlined,
} from "@ant-design/icons-vue";
</script>
