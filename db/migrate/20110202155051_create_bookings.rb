class CreateBookings < ActiveRecord::Migration
  def self.up
    create_table :bookings do |t|
      t.integer :user_id
      t.integer :hotel_id
      t.date :checkinDate
      t.date :checkoutDate
      t.string :creditCardNumber
      t.string :creditCardType
      t.string :creditCardName
      t.integer :creditCardExpiryMonth
      t.integer :creditCardExpiryYear
      t.boolean :smoking
      t.integer :beds

      t.timestamps
    end
  end

  def self.down
    drop_table :bookings
  end
end
