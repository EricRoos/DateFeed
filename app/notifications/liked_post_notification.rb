# To deliver this notification:
#
# LikedPostNotification.with(post: @post).deliver_later(current_user)
# LikedPostNotification.with(post: @post).deliver(current_user)

class LikedPostNotification < Noticed::Base
  # Add your delivery methods
  #
  deliver_by :database
  # deliver_by :email, mailer: "UserMailer"
  # deliver_by :slack
  # deliver_by :custom, class: "MyDeliveryMethod"

  # Add required params
  #
  # param :post

  # Define helper methods to make rendering easier.
  #
  def message
    "Hello"
  end

  def url
    "/"
  end
end
