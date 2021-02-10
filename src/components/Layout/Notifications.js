import React, { Component, Fragment } from "react";
import dayjs from "dayjs";
import PropTypes from "prop-types";

import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import ToolTip from "@material-ui/core/ToolTip";
import Typography from "@material-ui/core/Typography";
import Badge from "@material-ui/core/Badge";

import NotificationsIcon from "@material-ui/icons/Notifications";
import FavouriteIcon from "@material-ui/icons/Favorite";
import ChatIcon from "@material-ui/icons/Chat";

import { connect } from "react-redux";
import { markNotificationsRead } from "../../redux/actions/userActions";

var relativeTime = require("dayjs/plugin/relativeTime");
const Link = require("react-router-dom").Link;

class Notifications extends Component {
  state = {
    anchorEl: null,
  };

  handleOpen = (event) => {
    this.setState({ anchorEl: event.target });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  onMenuOpened = () => {
    let unreadNotificationIds = this.props.notifications
      .filter((notification) => !notification.read)
      .map((notification) => notification.notificationId);

    this.props.markNotificationsRead(unreadNotificationIds);
  };

  render() {
    const { notifications } = this.props;
    const { anchorEl } = this.state;

    dayjs.extend(relativeTime);

    let notificationIcon;

    if (notifications && notifications.length > 0) {
      let unreadNotificationNumber = notifications.filter(
        (notification) => notification.read === false
      ).length;
      unreadNotificationNumber > 0
        ? (notificationIcon = (
            <Badge badgeContent={unreadNotificationNumber} color="secondary">
              <NotificationsIcon />
            </Badge>
          ))
        : (notificationIcon = <NotificationsIcon />);
    } else {
      notificationIcon = <NotificationsIcon />;
    }

    let notificationsMarkup =
      notifications && notifications.length > 0 ? (
        notifications.map((notification) => {
          const verb = notification.type === "like" ? "liked" : "commented on";
          const time = dayjs(notifications.createdAt).fromNow();
          const iconColor = notification.read ? "primary" : "secondary";
          const icon =
            notification.type === "like" ? (
              <FavouriteIcon color={iconColor} style={{ marginRight: 10 }} />
            ) : (
              <ChatIcon color={iconColor} style={{ marginRight: 10 }} />
            );
          function capitalize(s) {
            return s && s[0].toUpperCase() + s.slice(1);
          }
          return (
            <MenuItem
              key={notification.createdAt}
              onClick={this.handleClose}
              component={Link}
              to={`/user/${notification.recipient}/post/${notification.postId}`}
            >
              {icon}
              <Typography color="primary" variant="body1">
                {capitalize(notification.sender)} {verb} your post {time}.
              </Typography>
            </MenuItem>
          );
        })
      ) : (
        <MenuItem onClick={this.handleClose}>
          You have no notifications.
        </MenuItem>
      );

    return (
      <Fragment>
        <ToolTip title="Notifications">
          <IconButton
            aria-owns={anchorEl ? "simple-menu" : undefined}
            aria-haspopup="true"
            onClick={this.handleOpen}
          >
            {notificationIcon}
          </IconButton>
        </ToolTip>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
          onEntered={this.onMenuOpened}
        >
          {notificationsMarkup}
        </Menu>
      </Fragment>
    );
  }
}

Notifications.propTypes = {
  markNotificationsRead: PropTypes.func.isRequired,
  notifications: PropTypes.array,
};

const mapStateToProps = (state) => ({
  notifications: state.user.notifications,
});

export default connect(mapStateToProps, { markNotificationsRead })(
  Notifications
);
