class Performance < ApplicationRecord 
  def initialize(name)
    self[:name] = name
    self[:votes] = 0
  end

  def increase_votes
    self[:votes] = self[:votes] + 1
  end

  def decrease_votes
    self[:votes] = self[:votes] - 1
  end
end
