class JavascriptErrorsController < ApplicationController

  def create
    Rails.logger.info(params);
  end
end
