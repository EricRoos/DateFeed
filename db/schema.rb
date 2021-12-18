# frozen_string_literal: true

# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20_211_218_163_925) do
  # These are extensions that must be enabled in order to support this database
  enable_extension 'plpgsql'

  create_table 'app_tokens', force: :cascade do |t|
    t.string 'token'
    t.string 'app_name'
    t.datetime 'created_at', precision: 6, null: false
    t.datetime 'updated_at', precision: 6, null: false
    t.string 'host'
    t.index ['token'], name: 'index_app_tokens_on_token'
  end

  create_table 'post_interactions', force: :cascade do |t|
    t.bigint 'profile_id', null: false
    t.bigint 'post_id', null: false
    t.datetime 'created_at', precision: 6, null: false
    t.datetime 'updated_at', precision: 6, null: false
    t.index ['post_id'], name: 'index_post_interactions_on_post_id'
    t.index ['profile_id'], name: 'index_post_interactions_on_profile_id'
  end

  create_table 'posts', force: :cascade do |t|
    t.text 'content'
    t.bigint 'profile_id', null: false
    t.datetime 'created_at', precision: 6, null: false
    t.datetime 'updated_at', precision: 6, null: false
    t.index ['profile_id'], name: 'index_posts_on_profile_id'
  end

  create_table 'profiles', force: :cascade do |t|
    t.string 'name'
    t.integer 'age'
    t.datetime 'created_at', precision: 6, null: false
    t.datetime 'updated_at', precision: 6, null: false
    t.bigint 'user_id', null: false
    t.index ['user_id'], name: 'index_profiles_on_user_id'
  end

  create_table 'users', force: :cascade do |t|
    t.string 'email', default: '', null: false
    t.string 'encrypted_password', default: '', null: false
    t.string 'reset_password_token'
    t.datetime 'reset_password_sent_at', precision: 6
    t.datetime 'remember_created_at', precision: 6
    t.datetime 'created_at', precision: 6, null: false
    t.datetime 'updated_at', precision: 6, null: false
    t.index ['email'], name: 'index_users_on_email', unique: true
    t.index ['reset_password_token'], name: 'index_users_on_reset_password_token', unique: true
  end

  add_foreign_key 'post_interactions', 'posts'
  add_foreign_key 'post_interactions', 'profiles'
  add_foreign_key 'posts', 'profiles'
  add_foreign_key 'profiles', 'users'
end
