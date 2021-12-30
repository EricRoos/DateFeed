module Mutations
  class AddPhoto < BaseMutation
    field :profile_image, Types::ProfileImageType, null: false

    argument :file, ApolloUploadServer::Upload, required: true

    def resolve(file:)
      Rails.logger.info(file)
      profile_image = ProfileImage.new(profile: context[:current_user].profile)
      profile_image.image.attach(io:file.to_io, filename: "#{SecureRandom.alphanumeric(12)}.#{file.original_filename}")
      profile_image.save
      { profile_image: profile_image }
    end
  end
end
