class User < ActiveRecord::Base

  has_many :bookings, :dependent => :destroy

  def to_json(options = {}) 

    options[:except] ||= [:password]
    super(options)
  end
end
