# To deliver this notification:
#
class UserSignInNotification < Noticed::Base
  # Add your delivery methods
  #
  deliver_by :slack if Rails.env.production?

  # Add required params
  #
  #param :interaction
  #
  def url
    Rails.application.credentials.slack[:notification_url]
  end

  def message
  end
end
