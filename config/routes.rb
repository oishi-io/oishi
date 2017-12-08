Rails.application.routes.draw do
  mount RailsAdmin::Engine => '/admin', as: 'rails_admin'
  mount Attachinary::Engine => "/attachinary"
  devise_for :users
  root to: 'pages#home'

  resources :recipes do
    resources :measures, only: [:new, :create, :edit, :update, :destroy]
  end

  resources :tools
  resources :tags, only: [:new, :create, :edit, :update, :destroy]
  resources :ingredients
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
