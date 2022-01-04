# frozen_string_literal: true
require 'sidekiq/web'
Rails.application.routes.draw do
  mount Sidekiq::Web => "/sidekiq"
  post '/javascript_errors', to: 'javascript_errors#create'
  get '/app-service-worker.js', to: 'service_worker#service_worker'
  get '/manifest.json', to: 'service_worker#manifest'

  devise_for :users, controllers: {
    registrations: 'users/registrations'
  }

  post '/graphql', to: 'graphql#execute'
  root to: 'dashboard#index'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
