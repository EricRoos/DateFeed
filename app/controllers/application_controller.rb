# frozen_string_literal: true

class ApplicationController < ActionController::Base
  before_action :authenticate_user!
  before_action :show_cookies
  before_action :ensure_confirmed

  private

  def ensure_confirmed
    return if devise_controller?
    return unless current_user.present?
    redirect_to '/users/sign_up/#/confirm' unless current_user.confirmed?
  end
  def show_cookies
    cookies.signed[:user_id] = current_user&.id
  end

end
