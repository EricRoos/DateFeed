class CreateProfileGeoDetails < ActiveRecord::Migration[7.1]
  def change
    create_table :profile_geo_details do |t|
      t.float :latitude
      t.float :longitude
      t.references :profile, null: false, foreign_key: true

      t.timestamps
    end
  end
end
