Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  post 'api/test', to: 'application#test'

  namespace :api, defaults: { format: :json } do
    resources :users, only: [:index, :create, :show]
    resource :session, only: [:show, :create, :destroy]
    
    resources :posts, only: [:show, :create, :update, :destroy, :index] do 
      resources :comments, only: [:index, :show, :create, :update, :destroy]
    end

    resources :comments, only: [:show, :index, :create, :update, :destroy]
    resources :likes, only: [:show, :create, :update, :destroy]
    resources :follows, only: [:create, :destroy]
  end

  get '*path', to: 'static_pages#frontend'
end
