class AsyncTouchJob < ApplicationJob
  queue_as :default

  def perform(model)
    model.touch
    if model.respond_to?(:index!)
      model.index!
    end
  end
end
