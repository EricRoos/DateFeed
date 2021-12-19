# frozen_string_literal: true

module Types
  class CreatePostInputType < Types::BaseInputObject
    argument :content, String, 'content of the post', required: true
  end
end
