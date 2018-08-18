Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  # Performance routes
  get '/performances' => 'performances#get_all'
  get '/performances/:id' => 'performances#find_by_id'
  get '/performances/:name' => 'performances#find_by_name'
  post '/performances/new' => 'performances#new'
  post '/performances/:id/vote' => 'performances#vote' # parameter inside will indicate whether to increase or decrease votes
  delete '/performances/:id' => 'performances#delete'
en
