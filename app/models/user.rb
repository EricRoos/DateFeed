# frozen_string_literal: true

class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  has_one :profile
  has_many :posts, through: :profile

  after_commit :create_profile, on: :create

  private

  def create_profile
    return profile if profile.present?

    self.profile = Profile.create!(user: self)
  end
end