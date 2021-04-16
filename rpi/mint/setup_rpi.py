#!/usr/bin/env python3

# -*- coding: utf-8 -*-
# ------------------------------------------------------------------------------
# Name:        init
# Purpose:     Wrapper function
#
# Author:      Yugabdh Pashte <yugabdhppashte.com>
# ------------------------------------------------------------------------------

import time
import RPi.GPIO as GPIO


# Setting GPIO PINS
# Referring to GPIO pins using the physical pin numbers on the GPIO connector
# GPIO.setmode(GPIO.BOARD)


def setting_lights(db):
    # LED pin numbers
    pins = {
        'bedroom_1': 11,
        'bedroom_2': 13,
        'kitchen': 15,
        'living': 19
    }

    print("[*] Setting Up pins...")
    # Setting up pins for output
    GPIO.setup(pins['bedroom_1'], GPIO.OUT)
    GPIO.setup(pins['bedroom_2'], GPIO.OUT)
    GPIO.setup(pins['kitchen'], GPIO.OUT)
    GPIO.setup(pins['living'], GPIO.OUT)

    print("[+] Finished setting Up pins...")

    time.sleep(3)
    print("[*] Fetching initial status...")

    # Getting recent status from Realtime Database
    result = dict(db.child('controls/lights').get().val())

    for lights, status in result.items():
        GPIO.output(pins[lights], status)

    print("[+] Updated lights status as per previous status")

    print(result)
