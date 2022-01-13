# frozen_string_literal: true

class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable, :trackable, :confirmable
  include GraphqlDevise::Concerns::Model

  has_one :profile
  has_many :posts, through: :profile

  has_many :notifications, as: :recipient


end
