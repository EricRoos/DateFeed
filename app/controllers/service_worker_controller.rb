class ServiceWorkerController < ApplicationController
  skip_before_action :authenticate_user!
  protect_from_forgery except: :service_worker

  def service_worker
    respond_to do |format|
      format.js
    end
  end

  def manifest
    respond_to do |format|
      format.json { render json: {
          "short_name": "Radius",
          "name": "Radius",
          "icons": [
            {
              "src": ActionController::Base.helpers.image_url("radius_badge.svg"),
              "type": "image/svg",
              "sizes": "192x192"
            },
          ],
          "start_url": root_path,
          "background_color": "#fff",
          "display": "standalone",
          "scope": root_path,
          "theme_color": "#000"
        }
      }
    end
  end
end
