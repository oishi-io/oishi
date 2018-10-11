Rails.application.routes.draw do
  mount Attachinary::Engine => "/attachinary"
  devise_for :users
  root to: 'pages#home'

  # RECIPES
  resources :recipes do
    resources :measures, only: [:new, :create, :edit, :update, :destroy]
    resources :steps, only: [:create, :destroy]
  end
  post '/recipes/:id/add_tags', to: 'recipes#add_tags'
  post '/recipes/:id/add_tools', to: 'recipes#add_tools'

  # MEASURES
  post '/measures/save_order', to: 'measures#save_order'

  # TOOLS
  resources :tools

  # TAGS
  resources :tags

  # INGREDIENTS
  resources :ingredients

  # EMAILS
  resources :emails
end
