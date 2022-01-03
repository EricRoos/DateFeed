require 'active_support/concern'

module AsyncTouchable
  extend ActiveSupport::Concern
  module ClassMethods
    def async_touch(association)
      after_commit -> { AsyncTouchJob.perform_later(self.send(association)) }
    end
  end
end
