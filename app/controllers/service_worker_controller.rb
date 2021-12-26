class ServiceWorkerController < ApplicationController
  skip_before_action :authenticate_user!
  protect_from_forgery except: :service_worker

  def service_worker
    respond_to do |format|
      format.js
    end
  end

  def manifest
    render json: {
      "short_name": "DateFeed",
      "name": "Date Feed",
      "icons": [
        {
          "src": "<%= asset_path('icon_192.png') %>",
          "type": "image/png",
          "sizes": "192x192"
        },
        {
          "src": "<%= asset_path('icon_512.png') %>",
          "type": "image/png",
          "sizes": "512x512"
        }
      ],
      "start_url": "<%= root_path %>",
      "background_color": "#fff",
      "display": "standalone",
      "scope": "<%= root_path %>",
      "theme_color": "#000"
    }
  end
end
