class Booking < ActiveRecord::Base


  attr_accessor :checkinDate
  attr_accessor :checkoutDate
  attr_accessor :creditCardNumber
  attr_accessor :crediaCardType
  attr_accessor :creditCardName
  attr_accessor :creditCardExpiryMonth
  attr_accessor :creditCardExpiryYear
  attr_accessor :smoking
  attr_accessor :beds
  attr_accessor :user
  attr_accessor :hotel

  belongs_to :user, :class_name => 'User', :foreign_key => 'user_id'
  belongs_to :hotel, :class_name => 'Hotel', :foreign_key => 'hotel_id'

  accepts_nested_attributes_for :user, :hotel
end
