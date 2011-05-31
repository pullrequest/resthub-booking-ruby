class HotelsController < ApplicationController
  # GET /hotels
  # GET /hotels.xml
  def index
    @hotels = Hotel.all

    respond_to do |format|
      format.html # index.html.erb
      format.xml  { render :xml => @hotels }
      format.json { render :json => @hotels }
    end
  end

  # GET /hotels/1
  # GET /hotels/1.xml
  def show
    @hotel = Hotel.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.xml  { render :xml => @hotel }
      format.json { render :json => @hotel }
    end
  end

  # GET /hotels/new
  # GET /hotels/new.xml
  def new
    @hotel = Hotel.new

    respond_to do |format|
      format.html # new.html.erb
      format.xml  { render :xml => @hotel }
      format.json { render :json => @hotel }
    end
  end

  # GET /hotels/1/edit
  def edit
    @hotel = Hotel.find(params[:id])
  end

  # POST /hotels
  # POST /hotels.xml
  def create
    @hotel = Hotel.new(params[:hotel])

    respond_to do |format|
      if @hotel.save
        format.html { redirect_to(@hotel, :notice => 'Hotel was successfully created.') }
        format.xml  { render :xml => @hotel, :status => :created, :location => @hotel }
        format.json  { render :json => @hotel, :status => :created, :location => @hotel }
      else
        format.html { render :action => "new" }
        format.xml  { render :xml => @hotel.errors, :status => :unprocessable_entity }
        format.json  { render :json => @hotel.errors, :status => :unprocessable_entity }
      end
    end
  end

  # PUT /hotels/1
  # PUT /hotels/1.xml
  def update
    @hotel = Hotel.find(params[:id])

    respond_to do |format|
      if @hotel.update_attributes(params[:hotel])
        format.html { redirect_to(@hotel, :notice => 'Hotel was successfully updated.') }
        format.xml  { head :ok }
        format.json { head :ok }
      else
        format.html { render :action => "edit" }
        format.xml  { render :xml => @hotel.errors, :status => :unprocessable_entity }
        format.json  { render :json => @hotel.errors, :status => :unprocessable_entity }
      end
    end
  end

  # DELETE /hotels/1
  # DELETE /hotels/1.xml
  def destroy
    @hotel = Hotel.find(params[:id])
    @hotel.destroy

    respond_to do |format|
      format.html { redirect_to(hotels_url) }
      format.xml  { head :ok }
    end
  end

  def search
    size = params['size'].to_i || 5
    page = params['page'].to_i || 0


    logger.debug "Size of the list:  #{size}"
    logger.debug "Page number: #{page}"
    logger.debug "Offset: #{page*size}"
    logger.debug "Query: #{params['q']}"


    if(params['q']) then
      @hotel = Hotel.where("name LIKE ?",'%'+params['q']+'%').limit(size).offset(page*size)
    else
      @hotel = Hotel.limit(size).offset(page*size)
    end

    render :json => {'elements' => @hotel}
  end
end
