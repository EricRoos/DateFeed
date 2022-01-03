# frozen_string_literal: true

class ApplicationController < ActionController::Base
  before_action :authenticate_user!
  before_action :show_cookies

  private

  def show_cookies
    cookies.signed[:user_id] = current_user&.id
  end

end
