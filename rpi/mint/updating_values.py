#!/usr/bin/env python3

# -*- coding: utf-8 -*-
# ------------------------------------------------------------------------------
# Name:        updating_values
# Purpose:     Updating status as per realtime database
#
# Author:      Yugabdh Pashte <yugabdhppashte.com>
# ------------------------------------------------------------------------------

import time
import RPi.GPIO as GPIO


# Setting GPIO PINS
# Referring to GPIO pins using the physical pin numbers on the GPIO connector
GPIO.setmode(GPIO.BOARD)


def update_as_per_status(message):
    # LED pin numbers
    pins = {
        'bedroom_1': 11,
        'bedroom_2': 13,
        'kitchen': 15,
        'living': 19
    }

    # Getting recent status from Realtime Database
    if message['path'] == '/':
        print("[*] Subscribing to live changes...")
    else:
        _, path, room = message['path'].split('/')
        if path == 'lights':
            if room == 'bedroom_1':
                print('bedroom_1')
                GPIO.output(pins['bedroom_1'], message['data'])
            elif room == 'bedroom_2':
                print('bedroom_2')
                GPIO.output(pins['bedroom_2'], message['data'])
            elif room == 'kitchen':
                print('kitchen')
                GPIO.output(pins['kitchen'], message['data'])
            elif room == 'living':
                print('living')
                GPIO.output(pins['living'], message['data'])
            else:
                pass
