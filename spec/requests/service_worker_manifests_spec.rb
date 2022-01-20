require 'rails_helper'

RSpec.describe "ServiceWorkerManifests", type: :request do
  describe "GET /service_worker_manifests" do
    it "returns 200" do
      get '/manifest.json'
      expect(response).to have_http_status(200)
    end
  end
end
