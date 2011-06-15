BookingRor::Application.routes.draw do

  scope '/api' do
    
    match 'lucene/rebuild' => 'lucene#rebuild'

    match 'booking/user/:id' => 'bookings#find_by_user', :via => :get
    match 'booking/:id' => 'bookings#destroy', :via=> :delete
    match 'booking/:id' => 'bookings#show', :via => :get
    match 'booking' => 'bookings#create', :via => :post

    match 'user' => 'users#index', :via => :get
    match 'user/new' => 'users#new', :via => :get
    match 'user/check' => 'users#check', :default => {:format => 'json'}
    match 'user' => 'users#create', :via => :post
    match 'user/:id' => 'users#show', :via => :get
    match 'user/:id' => 'users#destroy', :via => :delete
    match 'user/:id' => 'users#update', :via => :put
    match 'user/:id/edit' => 'users#edit', :via => :get

    match 'hotel/search' => 'hotels#search', :via => :get
    match 'hotel/:id' => 'hotels#show', :via => :get, :default => {:format => 'json'}
  end

  scope '/admin' do

    resources :users
    resources :hotels
    resources :bookings
  end
  
end
