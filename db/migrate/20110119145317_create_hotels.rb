class CreateHotels < ActiveRecord::Migration
  def self.up
    create_table :hotels do |t|
      t.string :name
      t.string :address
      t.string :city
      t.string :state
      t.string :zip
      t.string :country
      t.integer :start
      t.float :price

      t.timestamps
    end
  end

  def self.down
    drop_table :hotels
  end
end
