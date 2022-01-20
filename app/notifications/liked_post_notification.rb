# To deliver this notification:
#
# LikedPostNotification.with(post: @post).deliver_later(current_user)
# LikedPostNotification.with(post: @post).deliver(current_user)

class LikedPostNotification < Noticed::Base
  # Add your delivery methods
  #
  deliver_by :database
  deliver_by :graphql, class: "DeliveryMethods::Graphql"
  # deliver_by :email, mailer: "UserMailer"
  # deliver_by :slack
  # deliver_by :custom, class: "MyDeliveryMethod"

  # Add required params
  #
  param :interaction

  public
  def message
    "#{params[:interaction].profile.name || 'Someone'} liked your post"  
  end
end
