class LuceneController < ApplicationController

  def rebuild

    @response = "Search engine index rebuilded."

    render :json => @response
  end
end
