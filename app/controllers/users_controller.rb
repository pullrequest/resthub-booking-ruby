class UsersController < ApplicationController
  # GET /users
  # GET /users.xml
  def index
    @users = User.all

    respond_to do |format|
      format.html # index.html.erb
      format.json  { render :json => @users }
      format.xml  { render :xml => @users }
      format.json  { render :json => @users }
    end
  end

  # GET /users/1
  # GET /users/1.xml
  def show
    @user = User.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.xml  { render :xml => @user }
      format.json  { render :json => @user }
    end
  end

  # GET /users/new
  # GET /users/new.xml
  def new
    @user = User.new

    respond_to do |format|
      format.html # new.html.erb
      format.xml  { render :xml => @user }
      format.json  { render :json => @user }
    end
  end

  # GET /users/1/edit
  def edit
    @user = User.find(params[:id])
  end

  # POST /users
  # POST /users.xml
  def create
    logger.debug params.inspect
    params.delete('action')
    params.delete('controller')
    logger.debug params[:user]
    @user = User.new(params[:user] || params)

    logger.debug ActiveRecord::Base.include_root_in_json

    if @user.save
      render :json => @user, :status => :created, :location => @user
    else
      render :json => @user.errors, :status => :unprocessable_entity
    end
  end

  # PUT /users/1
  # PUT /users/1.xml
  def update
    @user = User.find(params[:id])
    params.delete('action')
    params.delete('controller')
    respond_to do |format|
      if @user.update_attributes(params[:user] || params)
        format.html { redirect_to(@user, :notice => 'User was successfully updated.') }
        format.xml  { head :ok }
        format.json  { head :ok }
      else
        format.html { render :action => "edit" }
        format.xml  { render :xml => @user.errors, :status => :unprocessable_entity }
        format.json  { render :json => @user.errors, :status => :unprocessable_entity }
      end
    end
  end

  # DELETE /users/1
  # DELETE /users/1.xml
  def destroy
    @user = User.find(params[:id])
    @user.destroy

    respond_to do |format|
      format.html { redirect_to(users_url) }
      format.xml  { head :ok }
      format.json  { head :ok }
    end
  end

  def check
    logger.debug 'Sent username: '+params.inspect
    @user = User.where('username = ?', params['username']).first;
    logger.debug 'Retreived user: '
    logger.debug @user
    if( nil != @user && @user.password == params['password']) then
      render :json => @user
    else
      render :json => @user, :status => :forbidden
    end
  end

end
