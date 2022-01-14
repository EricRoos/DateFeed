# frozen_string_literal: true

class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable, :trackable, :confirmable
  include GraphqlDevise::Concerns::Model

  has_one :profile, inverse_of: :user
  has_many :posts, through: :profile

  has_many :notifications, as: :recipient
  
  accepts_nested_attributes_for :profile


end
