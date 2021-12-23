module Mutations
  class LogLocation < BaseMutation
     field :logged, Boolean, null: false

    # TODO: define arguments
    argument :latitude, Float, required: true
    argument :longitude, Float, required: true

    # TODO: define resolve method
    def resolve(latitude:, longitude:)
      geo_detail = context[:current_user].profile.profile_geo_detail
      if !geo_detail.present?
        geo_detail = ProfileGeoDetail.new(profile: context[:current_user].profile)
      end

      geo_detail.latitude = latitude 
      geo_detail.longitude = longitude
      { logged: geo_detail.save }
    end
  end
end
