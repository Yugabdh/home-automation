#!/usr/bin/env python3

# -*- coding: utf-8 -*-
# ------------------------------------------------------------------------------
# Name:        init
# Purpose:     Wrapper function
#
# Author:      Yugabdh Pashte <yugabdhppashte.com>
# ------------------------------------------------------------------------------

import json
import time
import datetime
import os

# import RPi.GPIO as GPIO

import pyrebase
from mint.setup_rpi import setting_lights
from mint.updating_values import update_as_per_status


def light_controller(name, pin_number, control_type, channel):
    pass


def run():
    """
    Wrapper function
    :return:
    """
    try:
        config = {
            "apiKey": "AIzaSyAuCTqn2cqQFCTvmbT4eQHWhxsbtoV1jNI",
            "authDomain": "mint-ioe.firebaseapp.com",
            "databaseURL": "https://mint-ioe-default-rtdb.firebaseio.com",
            "projectId": "mint-ioe",
            "storageBucket": "mint-ioe.appspot.com",
            "messagingSenderId": "148223887470",
            "appId": "1:148223887470:web:e076ec198811521aa2fe7f",
            "measurementId": "G-RXS2T96VQP"
        }

        firebase = pyrebase.initialize_app(config)
        db = firebase.database()
        setting_lights(db)
        my_stream = db.child('controls').stream(update_as_per_status)

    except Exception as e:
        print(e)

    except KeyboardInterrupt:
        my_stream.close()
    finally:
        pass
        # GPIO.cleanup()
