class Booking < ActiveRecord::Base

  belongs_to :user, :class_name => 'User', :foreign_key => 'user_id'
  belongs_to :hotel, :class_name => 'Hotel', :foreign_key => 'hotel_id'

  accepts_nested_attributes_for :user, :hotel
end
