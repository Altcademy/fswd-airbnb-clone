Rails.application.routes.draw do
 

  namespace :api do
    # Add routes below this line
    resources :users, only: [:create]
    resources :sessions, only: [:create, :destroy]
    resources :properties, only: [:index, :show, :create, :update]
    resources :bookings, only: [:create] do
      collection do
        get 'my_bookings' => 'bookings#get_user_bookings'
      end
    end
    resources :charges, only: [:create]

    get '/properties/:id/bookings' => 'bookings#get_property_bookings'
    get '/authenticated' => 'sessions#authenticated'
     
    # stripe webhook
    post '/charges/mark_complete' => 'charges#mark_complete'
  end

  # login sign up
  get '/login' => 'static_pages#login'
  
  # property, edit property, add property
  get '/property/:id' => 'static_pages#property'
  get '/property/:id/edit' => 'static_pages#editProperty'
  get '/add-property' => 'static_pages#addProperty'

  # booking success
  get 'booking/:id/success' => 'static_pages#success'
 
  # my pages
  get '/hosting' => 'static_pages#hosting'

  # home
  root to: 'static_pages#home'
end