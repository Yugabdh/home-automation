#!/usr/bin/env python3

# -*- coding: utf-8 -*-
# ------------------------------------------------------------------------------
# Name:        init
# Purpose:     Wrapper function
#
# Author:      Yugabdh Pashte <yugabdhppashte.com>
# ------------------------------------------------------------------------------

import time
import threading
import sys
# import RPi.GPIO as GPIO

from mint.firebase_configure.configure import db


# Setting GPIO PINS
# Referring to GPIO pins using the physical pin numbers on the GPIO connector
# GPIO.setmode(GPIO.BOARD)


PINS = {
    'Bedroom_1': 11,
    'Bedroom_2': 13,
    'Kitchen': 15,
    'Living_room': 19,
    'GPIO_TRIGGER': 16,
    'GPIO_ECHO': 18
}

security = False

def intruder_alert():
    # set Trigger to HIGH
    # GPIO.output(GPIO_TRIGGER, True)
 
    # # set Trigger after 0.01ms to LOW
    # time.sleep(0.00001)
    # GPIO.output(GPIO_TRIGGER, False)
 
    global PINS

    # StartTime = time.time()
    # StopTime = time.time()
 
    # # save StartTime
    # while GPIO.input(PINS["GPIO_ECHO"]) == 0:
    #     StartTime = time.time()
 
    # # save time of arrival
    # while GPIO.input(PINS["GPIO_ECHO"]) == 1:
    #     StopTime = time.time()
 
    # # time difference between start and arrival
    # TimeElapsed = StopTime - StartTime
    # # multiply with the sonic speed (34300 cm/s)
    # # and divide by 2, because there and back
    # distance = (TimeElapsed * 34300) / 2
    
    # if distance < 3:
    #     print("[!] Intruder")
    #     return True
    # else:
    #     return False
    return True
 


def load_initial_status(docs):
    """
    Gets intial status of appliances from database
    :return:
    """

    global PINS

    print("[*] Loading initial status...")

    for doc in docs:
        data = doc.to_dict()
        print(f"[+] Updating status of {data['name']} to {data['value']}")
        pin = PINS[data['id']]
        # GPIO.output(pin, data['value'])



def run():
    """
    Wrapper function
    :return:
    """

    global security
    
    # Create a callback on_snapshot function to capture changes
    def on_snapshot(doc_snapshot, changes, read_time):
        for change in changes:
            if change.type.name == 'MODIFIED':
                data = change.document.to_dict()
                print(u'Modified value: {}'.format(data['name']))
                pin = PINS[data['id']]
                # GPIO.output(pin, data['value'])
                
    # Create a callback on_snapshot function to capture changes
    def on_security_change(doc_snapshot, changes, read_time):
        global security
        for change in changes:
            if change.type.name == 'MODIFIED':
                data = change.document.to_dict()
                print(u'Security Mode: {}'.format(data['value']))
                security = data['value']
                
                # GPIO.output(pin, data['value'])

    try:
        # Ultrasonic ---->
        # # Trigger
        # GPIO.setup(GPIO_TRIGGER, GPIO.OUT)
        # # Echo
        # GPIO.setup(GPIO_ECHO, GPIO.IN)

        print("[*] Waiting for sensors to settel...")
        time.sleep(2)
        print("[+] Finished...")

        # Lights ref
        controls_ref = db.collection('controls')

        # Ultrasonic ref
        us_ref = db.collection('sensors').document(u'ultrasonic')
        # PIR ref
        pir_ref = db.collection('sensors').document(u'pir')

        # Security mode ref
        sec_ref = db.collection('modes').document(u'Security mode')

        # Getting multiple data
        docs = controls_ref.stream()
        load_initial_status(docs)

        # Listing to realtime changes
        doc_watch = controls_ref.on_snapshot(on_snapshot)
        sec_watch = sec_ref.on_snapshot(on_security_change)

        while True:
            time.sleep(1)
            intruder = intruder_alert()
            if(intruder and security):
                us_ref.update({u'value': True})
                time.sleep(5)

    except KeyboardInterrupt:
        doc_watch.unsubscribe()
        sec_watch.unsubscribe()
    
    except Exception as e:
        print(e)

    finally:
        # GPIO.cleanup()
        sys.exit(1)
