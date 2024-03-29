# frozen_string_literal: true

# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
AppToken.create(host: '127.0.0.1', token: 'local-token', app_name: 'rails_app')
FactoryBot.create_list(:profile, 10)

Profile.all.each do |p|
  FactoryBot.create(:post, profile:p, interacted_with_by: Profile.where("id != ?", p.id).to_a)
end

Profile.all.each(&:index!)
