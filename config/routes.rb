Rails.application.routes.draw do
  mount RailsAdmin::Engine => '/admin', as: 'rails_admin'
  mount Attachinary::Engine => "/attachinary"
  devise_for :users
  root to: 'pages#home'

  # RECIPE
  resources :recipes do
    resources :measures, only: [:new, :create, :edit, :update, :destroy]
  end
  get '/recipes/:id/add_details', to: 'recipes#add_details', as: :add_details
  post '/recipes/:id/add_tags', to: 'recipes#add_tags'
  post '/recipes/:id/add_tools', to: 'recipes#add_tools'

  # TOOL
  resources :tools

  # TAG
  resources :tags

  # INGREDIENT
  resources :ingredients

   # INGREDIENT
   resources :emails

end
