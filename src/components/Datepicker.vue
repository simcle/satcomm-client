<template>
    <div class="menu-picker">
        <div class="input-group">
            <span class="input-group-prepend">
                <span class="input-group-text"><i class="icon-calendar3"></i></span>
            </span>
            <input @click="isOpen = !isOpen" id="picker" type="button" class="form-control"  :value=" date_label+': '+ date">
        </div>
        
        <div v-show="isOpen" @mouseleave="onMouseLeave" class="picker">
            <ul class="options">
                <li v-if="active != 'day'" @mouseover="onMouseOver('day')" @click="onSelect('day')" :class="[daterange == 'day' ?'option_hover': 'option']">
                    Hari ini
                </li>
                <li v-if="active == 'day'" @mouseover="onMouseOver('day')" @click="onSelect('day')" :class="[daterange == 'day' ?'option_hover': 'option']" class="text-danger">
                    Hari ini
                </li>
                <li v-if="active != 'week'" @mouseover="onMouseOver('week')" @click="onSelect('week')" :class="[daterange == 'week'?'option_hover': 'option']">
                    7 Hari terakhir
                </li>
                <li v-if="active == 'week'" class="text-danger" @mouseover="onMouseOver('week')" @click="onSelect('week')" :class="[daterange == 'week'?'option_hover': 'option']">
                    7 Hari terakhir
                </li>
                <li v-if="active != 'month'" @mouseover="onMouseOver('month')" @click="onSelect('month')" :class="[daterange == 'month'?'option_hover': 'option']">
                    Bulan Ini
                </li>
                <li v-if="active == 'month'" class="text-danger" @mouseover="onMouseOver('month')" @click="onSelect('month')" :class="[daterange == 'month'?'option_hover': 'option']">
                    Bulan Ini
                </li>
                <li class="option-split-line has-date-picker">
                    <hr>
                </li>
                <li v-if="active !='perday'" @mouseover="onMouseOver('perday')" :class="[daterange == 'perday'?'option_hover': 'option']">
                    Per Hari
                    <div class="option-icon">
                        <i class="icon-arrow-right22"></i>
                    </div>
                </li>
                <li v-if="active =='perday'" class="text-danger" @mouseover="onMouseOver('perday')" :class="[daterange == 'perday'?'option_hover': 'option']">
                    Per Hari
                    <div class="option-icon">
                        <i class="icon-arrow-right22"></i>
                    </div>
                </li>
                <li v-if="active != 'permonth'" @mouseover="onMouseOver('permonth')" :class="[daterange == 'permonth'?'option_hover': 'option']">
                    Per Bulan
                    <div class="option-icon">
                        <i class="icon-arrow-right22"></i>
                    </div>
                </li>
                <li v-if="active == 'permonth'" class="text-danger" @mouseover="onMouseOver('permonth')" :class="[daterange == 'permonth'?'option_hover': 'option']">
                    Per Bulan
                    <div class="option-icon">
                        <i class="icon-arrow-right22"></i>
                    </div>
                </li>
                <li v-if="active != 'peryear'" @mouseover="onMouseOver('peryear')" :class="[daterange == 'peryear'?'option_hover': 'option']">
                    Per Tahun
                    <div class="option-icon">
                        <i class="icon-arrow-right22"></i>
                    </div>
                </li>
                <li v-if="active == 'peryear'" class="text-danger" @mouseover="onMouseOver('peryear')" :class="[daterange == 'peryear'?'option_hover': 'option']">
                    Per Tahun
                    <div class="option-icon">
                        <i class="icon-arrow-right22"></i>
                    </div>
                </li>
            </ul>
            <div class="date-picker" :class="[datepicker ? 'd-block':'d-none']">
                <div :class="[daterange=='perday'?'d-block':'d-none']">
                    <div class="per-day"></div>
                </div>
                <div :class="[daterange=='permonth'?'d-block':'d-none']">
                    <div class="per-month"></div>
                </div>
                <div :class="[daterange=='peryear'?'d-block':'d-none']">
                    <div class="per-year"></div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import $ from 'jquery'
export default {
    data () {
        return {
            isOpen: false,
            daterange: '',
            datepicker: false,
            date: '',
            date_label: '',
            active: '',
        }
    },
    mounted () {
        var today = new Date()
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); 
        var yyyy = today.getFullYear();
        this.date = dd+'-'+mm+'-'+yyyy
        this.date_label = 'Hari ini'
        this.daterange = 'day'
        this.active = 'day'
        let app = this
        
        $('.per-day').datepicker({
            
            view: 'days',
            minView: 'days',
            dateFormat: 'dd-mm-yyyy',
            clearButton: false,
            onSelect: function () {
                app.date = $('.per-day').val()
                app.date_label ='Per Hari'
                app.active = 'perday'
                app.isOpen = false
            },
        })
        $('.per-month').datepicker({
            
            view: 'months',
            minView: 'months',
            dateFormat: 'mm-yyyy',
            onSelect: function () {
                app.date = $('.per-month').val()
                app.date_label ='Per Bulan'
                app.active = 'permonth'
                app.isOpen = false
            },
        })
        $('.per-year').datepicker({
            
            view: 'years',
            minView: 'years',
            dateFormat: 'yyyy',
            onSelect: function () {
                app.date = $('.per-year').val()
                app.date_label ='Per Tahun'
                app.active = 'peryear'
                app.isOpen = false
            },
        })
    },
    methods: {
        onMouseOver (val) {
            this.daterange = val
            if(val == 'perday' || val == 'permonth' || val == 'peryear') {
                this.datepicker = true
            } else {
                this.datepicker = false
            }
        },
        onMouseLeave () {
            this.daterange = ''
            this.datepicker = false
        },
        onSelect(val) {
            var today = new Date()
            var dd = String(today.getDate()).padStart(2, '0');
            var mm = String(today.getMonth() + 1).padStart(2, '0'); 
            var yyyy = today.getFullYear();
            this.active = val
            if(val == 'day') {
                this.date = dd+'-'+mm+'-'+yyyy
                this.date_label = 'Hari ini'
            }
            if(val == 'week') {
                this.date = '7 Hari'
                this.date_label = '7 hari terakhir'
            }
            if(val == 'month') {
                this.date = mm+'-'+yyyy
                this.date_label = 'Bulan ini'
            }
            if(val == 'year') {
                this.date = yyyy
                this.date_label = 'Tahun ini'
            }
            this.$nextTick(() => {
                this.isOpen = false
            })
        }
    },
    watch: {
        date (val) {
            this.$emit('date', val)
        },
    },
}
</script>
<style  scoped>
     ul {
        list-style: none;
        padding: 0;
        margin: 0;
    }
    .picker {
        position: absolute;
        margin-top: 2px;
        z-index: 99;
        width: 390px;
        background: #f6f6f6;
        -webkit-box-shadow: 0 0 4px 0 rgba(0,0,0,.05), 0 8px 8px 0 rgba(0,0,0,.09);
        box-shadow: 0 0 4px 0 rgba(0,0,0,.05), 0 8px 8px 0 rgba(0,0,0,.09);
        border-radius: 3px;
        cursor: pointer;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }
    .options {
        width: 100%;
        font-size: 14px;
        color: #333;
        padding: 8px 0;
    }
    .option:first-child {
        margin-top: 0;
    }
    .option {
        /* display: -webkit-box; */
        display: -ms-flexbox;
        display: flex;
        /* -webkit-box-align: center; */
        -ms-flex-align: center;
        align-items: center;
        line-height: 40px;
        padding-left: 24px;
    }
    .option_hover {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        line-height: 40px;
        padding-left: 24px;
        background-color: #fff;
    }
    .option-split-line.has-date-picker {
        padding-right: 260px;
    }
    .option-icon {
        position: absolute;
        right: 260px;
        display: inline-block;
        margin-left: 12px;
        line-height: 40px;
    }
    .date-picker {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        background-color: #fff;
    }
    
</style>
<style>
    .date-picker .datepicker {
        border: none !important;        
    }
</style>